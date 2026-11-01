// Run before styles paint so saved/system appearance never flashes the wrong theme.
(()=>{let saved;try{saved=localStorage.getItem('moein-theme')}catch{}const mode=saved==='light'||saved==='dark'?saved:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=mode;document.documentElement.style.colorScheme=mode})();
