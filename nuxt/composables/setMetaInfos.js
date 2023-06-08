export const setMetaInfos = (aMetaObj) =>{  
  //console.log(aMetaObj, 'setting meta')  
  if(aMetaObj){   
    useSeoMeta({
      title: () => aMetaObj.seo_title,
      //description: () => aMetaObj.seo_description,
      ogLocale: () => 'de-DE',
      ogTitle: () => aMetaObj.seo_title,
      ogDescription: () => aMetaObj.seo_description,      
      ogImage: () => aMetaObj.seo_img_url ? aMetaObj.seo_img_url : ''
    })
  }
}