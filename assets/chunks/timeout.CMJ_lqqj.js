const s=(e,i=0)=>{let t=setTimeout(()=>{clearTimeout(t),t=null,e()},i)},o=(e,i=300)=>{let t=setTimeout(()=>{clearTimeout(t),t=null,e.classList.add("with-transition")},i)};export{s as t,o as w};
