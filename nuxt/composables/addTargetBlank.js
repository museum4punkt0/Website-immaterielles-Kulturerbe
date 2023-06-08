export const addTargetBlank = (domEl) =>{  
  document.querySelectorAll(domEl).forEach(function(a){
    console.log(a.href)
    if(a.href.includes('http://') || a.href.includes('https://')){
      a.setAttribute('target', '_blank');
    }
  })
}