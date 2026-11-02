// First visits start light; retain an explicit visitor choice across pages.
(()=>{let saved;try{saved=localStorage.getItem('moein-theme')}catch{}const mode=saved==='light'||saved==='dark'?saved:'light';document.documentElement.dataset.theme=mode;document.documentElement.style.colorScheme=mode})();
