/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
window.SNAP = {
  snap_api_url: "https://snap-api.tradepending.com",
  elasticsearch_url: '//thorin-us-east-1.searchly.com/vehicles_v15/_search',
  partner_id: null,

  set_api_url(url) {
    if (url?.length>0) {
      return this.snap_api_url = url;
    }
  },

  set_es_url(url) {
    if (url?.length>0) {
      return this.elasticsearch_url = url;
    }
  },

  configure(css_selector, callback) {
    return SNAP.configure_with_options({css_selector, include_new_cars: false, country: 'US'}, callback);
  },

  configure_with_options(options, callback) {
    // console.log "options: #{JSON.stringify(options)}"
    const self = this;
    let {
      css_selector
    } = options;
    const {
      include_new_cars
    } = options;
    let {
      country
    } = options;
    const {
      ymm_only
    } = options;
    this.partner_id = options.partner_id;

    if (typeof callback !== 'function') {
      return callback(new Error("callback function is required"));
    }
    if ((css_selector == null) || (css_selector.length<1)) {
      css_selector = "#tradepending-vehicle-typeahead";
      console.log(`No CSS Selector specified so using default typeahead selector of: ${css_selector}`);
    }
    if ((country == null)) {
      country = 'US';
    }

    const timeout = null;

    jQuery(css_selector).typeaheadTP(
      {
        highlight: true,
        hint: false
      },
      {
        name: "vehicle-search",
        displayKey: "ymmt",
        source(query, callback) {
          let q;
          if (ymm_only) {
            q = {
              query: { bool: { must: { match: { ymm: { query, operator: "and" } } } } },
              aggs: {
                vehicles: {
                  terms: { field: "ymm.raw" },
                  aggs: { dedup_docs: { top_hits: { size:1 } } }
                }
              }
            };
          } else {
            q = {
              size: 10,
              query: { bool: { must: { match: { all_fields: { query, operator: "and" } } } } }
            };
          }
          if (!include_new_cars) {
            if (q.query.bool.must_not == null) { q.query.bool.must_not = []; }
            const current_year = (new Date()).getFullYear();
            q.query.bool.must_not.push({term: { "year.raw" : (current_year+1).toString() }});
            q.query.bool.must_not.push({term: { "year.raw" : (current_year+2).toString() }});
            q.query.bool.must_not.push({term: { "year.raw" : (current_year+3).toString() }});
          }
          if (country !== 'CA') {
            if (q.query.bool.must_not == null) { q.query.bool.must_not = []; }
            q.query.bool.must_not.push({term: { "country.raw" : "CA" }});
          }

          jQuery.support.cors = true;
          return jQuery.ajax({
            url: self.elasticsearch_url,
            headers: {
              "Authorization": "Basic " + btoa('turncar-two-snap-access:bximuxmt0fmectt6fucw89f7fhd3nshe')
            },
            type: 'POST',
            contentType: 'text/plain',
            crossDomain: true,
            dataType: 'json',
            data: JSON.stringify(q),
            success(resp) {
              let hits;
              const result = [];
              if (ymm_only) {
                hits = resp.aggregations.vehicles.buckets;
              } else {
                ({
                  hits
                } = resp.hits);
              }
              jQuery.each(hits, function(index, hit) {
                if (ymm_only) { hit = hit.dedup_docs.hits.hits[0]; }
                const v = hit._source;
                const car = {id: v.id, year: v.year, make: v.make, model: v.model};
                let ymmt = v.ymm;
                if (!ymm_only) {
                  ymmt += " " + v.trim;
                  car.trim = v.trim;
                }
                car.ymmt = ymmt;
                return result.push(car);
              });
              return callback(result);
            },
            error(error) {
              return console.log("plugin error:", JSON.stringify(error));
            }
          });
        }
      }
    ).bind("typeahead:selected", (evt, vehicle, name) => callback(vehicle));
    return jQuery(css_selector).focus();
  },

  next_attribute(dealer_id, vehicle, callback) {
    if ((dealer_id == null) || (dealer_id.length<1)) {
      return callback(new Error("dealer_id parameter is required"));
    }
    if (typeof vehicle !== 'object') {
      return callback(new Error("vehicle parameter is required"));
    }
    if (typeof callback !== 'function') {
      return callback(new Error("callback function is required"));
    }
    vehicle.dealer_id = dealer_id;
    if (this.partner_id != null) { vehicle.partner_id = this.partner_id; }
    const url = `${this.snap_api_url}/api/v3/select?` + $.param(vehicle);
    return $.getJSON(url, function(response) {
      const v = {};
      if (response.id != null) {
        v.id = response.id;
      }
      if (response.year != null) {
        v.year = response.year;
        v.ymmtd = v.year;
      }
      if (response.make != null) {
        v.make = response.make;
        v.ymmtd += " " + v.make;
      }
      if (response.model != null) {
        v.model = response.model;
        v.ymmtd += " " + v.model;
      }
      if (response.trim != null) {
        v.trim = response.trim;
        v.ymmtd += " " + v.trim;
      }
      if (response.body != null) {
        v.body = response.body;
        v.ymmtd += " " + v.body;
      }
      if (response.drivetrain != null) {
        v.drivetrain = response.drivetrain;
        v.ymmtd += " " + v.drivetrain;
      }
      if (response.engine != null) {
        v.engine = response.engine;
        v.ymmtd += " " + v.engine;
      }
      if (response.fuel_type != null) {
        v.fuel_type = response.fuel_type;
        v.ymmtd += " " + v.fuel_type;
      }
      if (response.doors != null) {
        v.doors = response.doors;
        v.ymmtd += " " + v.doors + " door";
      }
      if (response.choices != null) {
        return callback(undefined, {vehicle: v, attribute: response.select, choices: response.choices});
      } else {
        return callback(undefined, {vehicle: v});
      }
    });
  },

  get_report_url(dealer_id, vehicle, options) {
    const params = build_params(dealer_id, vehicle, options);
    const url = this.snap_api_url+'/report?'+ $.param(params);
    console.log(`get_report_url: ${url}`);
    return url;
  },

  get_report(dealer_id, vehicle, options, callback) {
    console.log(`partner: ${this.partner_id}`);
    const params = build_params(dealer_id, vehicle, options);
    params.format = 'json';
    const url = this.snap_api_url+'/api/v3/report?'+ $.param(params);
    console.log(`get_report: ${url}`);
    return jQuery.ajax({
      url,
      type: 'GET',
      contentType: 'text/plain',
      crossDomain: true,
      dataType: 'json',
      success(resp) {
        return callback(undefined, resp);
      },
      error(jqXHR, message, err) {
        return callback(err, undefined);
      }
    });
  }
};

var build_params = function(dealer_id, vehicle, options) {
  if ((dealer_id == null) || (dealer_id.length<1)) {
    throw new Error("dealer_id parameter is required");
  }
  if ((vehicle == null)) {
    throw new Error("vehicle parameter is required");
  }
  if ((vehicle?.id == null)) {
    throw new Error("No ID on vehicle. You must provide a vehicle with an ID to this method.");
  }

  const params = { 
    vehicle_id: vehicle.id,
    did: dealer_id
  };
  if (SNAP.partner_id != null) { params.partner_id = SNAP.partner_id; }
  if ((options?.zip_code?.length === 5) && !isNaN(options.zip_code)) {
    params.zip_code = options.zip_code;
  }
  if ((options?.mileage?.length>0) && !isNaN(options.mileage)) {
    params.mileage = parseInt(options.mileage);
  }
  return params;
};
