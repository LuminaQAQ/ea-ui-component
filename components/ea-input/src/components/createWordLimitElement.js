export function createWordLimitElement(e){const t=document.createElement("span");return t.className="ea-input_word-limit",t.innerText=`${e.value.length}/${this.maxLength}`,e.addEventListener("input",(e=>{t.innerText=`${e.target.value.length}/${this.maxLength}`})),t}