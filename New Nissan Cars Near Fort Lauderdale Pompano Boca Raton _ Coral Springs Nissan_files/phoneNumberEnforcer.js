"use strict";class PhoneNumberEnforcer{constructor(){this.enforceLabel(),this.initMutationObserver()}initMutationObserver(){const e=document.querySelector("[for='ePriceModalPhone']");e&&new MutationObserver((()=>{this.enforceLabel()})).observe(e,{subtree:!0,childList:!0})}enforceLabel(){const e=document.querySelector("[for='ePriceModalPhone']");(null==e?void 0:e.dataset.label)&&(null==e?void 0:e.innerHTML)!==e.dataset.label&&(e.innerHTML=e.dataset.label,console.warn("Attempt to change '#txtPhone' label text denied."))}}document.addEventListener("DOMContentLoaded",(function(){new PhoneNumberEnforcer}));