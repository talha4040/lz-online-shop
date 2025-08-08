
(function(){
  // Helper: Insert HTML before footer
  function insertBeforeFooter(html){
    var footer=document.querySelector('footer') || document.body;
    var div=document.createElement('div');
    div.innerHTML=html;
    footer.parentNode.insertBefore(div, footer);
  }

  // Styles
  var css = `
  .lz-section {margin:20px 0; padding:10px; border:1px solid #ddd; border-radius:6px; background:#fff;}
  .lz-slider img {width:100%; display:none; border-radius:6px}
  .lz-search-input {width:100%; padding:8px; border:1px solid #ccc; border-radius:4px}
  .lz-cat-grid, .lz-prod-grid {display:flex; flex-wrap:wrap; gap:12px;}
  .lz-cat-item, .lz-prod-item {text-align:center; border:1px solid #ddd; padding:8px; border-radius:6px}
  .lz-prod-item img {max-width:100%}
  .lz-coupon {background:#222;color:#fff;padding:14px;text-align:center;border-radius:6px}
  `;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Live Search HTML
  var liveSearchHTML = `
  <div class="lz-section">
    <h3>Search</h3>
    <input id="lz-live-search" class="lz-search-input" placeholder="Search products...">
    <ul id="lz-search-suggestions" style="display:none;list-style:none;margin:0;padding:0;border:1px solid #ddd;background:#fff;position:absolute;width:90%;z-index:99"></ul>
  </div>`;

  // Slider HTML
  var sliderHTML = `
  <div class="lz-section lz-slider">
    <h3>Slider</h3>
    <img src="https://picsum.photos/1200/350?1" style="display:block">
    <img src="https://picsum.photos/1200/350?2">
    <img src="https://picsum.photos/1200/350?3">
  </div>`;

  // Flash Sale HTML
  var flashSaleHTML = `
  <div class="lz-section">
    <strong>Flash Sale ends in:</strong> <span id="lz-timer"></span>
  </div>`;

  // Category HTML
  var catHTML = `
  <div class="lz-section">
    <h3>Categories</h3>
    <div class="lz-cat-grid">
      <div class="lz-cat-item"><img src="https://picsum.photos/80?cat1"><br>Mobiles</div>
      <div class="lz-cat-item"><img src="https://picsum.photos/80?cat2"><br>Home</div>
    </div>
  </div>`;

  // Product Grid HTML
  var prodHTML = `
  <div class="lz-section">
    <h3>Products</h3>
    <div class="lz-prod-grid">
      <div class="lz-prod-item">
        <img src="https://picsum.photos/200?prod1"><br>Product 1<br><strong>৳ 999</strong><br>
        <button onclick="alert('Added to cart')">Add to Cart</button>
      </div>
    </div>
  </div>`;

  // Coupon HTML
  var couponHTML = `<div class="lz-section lz-coupon">Use code <strong style="background:#fff;color:#000;padding:4px">LZFLASH10</strong> for discount!</div>`;

  // Insert all sections
  insertBeforeFooter(liveSearchHTML + sliderHTML + flashSaleHTML + catHTML + prodHTML + couponHTML);

  // Live Search script
  (function(){
    var input=document.getElementById('lz-live-search'),sugg=document.getElementById('lz-search-suggestions');
    if(!input||!sugg)return;
    var posts=[];
    var script=document.createElement('script');
    window.__lz_s_cb=function(data){
      try{
        posts=(data.feed.entry||[]).map(function(e){
          return {t:e.title.$t,u:(e.link.find(function(l){return l.rel==='alternate';})||{}).href||'#'};
        });
      }catch(e){}
    };
    script.src=location.protocol+'//'+location.host+'/feeds/posts/default?alt=json-in-script&callback=__lz_s_cb&max-results=500';
    document.body.appendChild(script);
    input.addEventListener('input',function(){
      var q=this.value.toLowerCase();
      if(!q){sugg.style.display='none';return;}
      var f=posts.filter(p=>p.t.toLowerCase().indexOf(q)!==-1).slice(0,8);
      if(!f.length){sugg.style.display='none';return;}
      sugg.innerHTML=f.map(x=>'<li style="padding:6px;cursor:pointer;border-bottom:1px solid #eee" data-url="'+x.u+'">'+x.t+'</li>').join('');
      sugg.style.display='block';
    });
    sugg.addEventListener('click',function(e){
      var li=e.target.closest('li');if(li)location.href=li.getAttribute('data-url');
    });
  })();

  // Slider script
  (function(){
    var imgs=document.querySelectorAll('.lz-slider img'),i=0;
    setInterval(function(){imgs[i].style.display='none';i=(i+1)%imgs.length;imgs[i].style.display='block';},4000);
  })();

  // Flash sale timer
  (function(){
    var end=new Date("2025-09-01T00:00:00Z");
    var el=document.getElementById('lz-timer');
    function up(){
      var d=end-new Date();if(d<=0){el.textContent='Ended';return;}
      var days=Math.floor(d/86400000),h=Math.floor(d/3600000)%24,m=Math.floor(d/60000)%60,s=Math.floor(d/1000)%60;
      el.textContent=days+'d '+h+'h '+m+'m '+s+'s';
    }
    up();setInterval(up,1000);
  })();

})();
