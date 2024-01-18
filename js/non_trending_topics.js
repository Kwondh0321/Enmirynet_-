const date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const dateStr = year + '년 ' + month + '월 ' + day + '일 ';
const timeStr = date.toLocaleTimeString('ko-kr');
const time = dateStr + timeStr;
i = 1;

async function gettrendingtopicsarticlesatnaverbyenmirynet() {
	let tag = document.getElementById("trending_topics_articles");
	tag.innerHTML = "<h3><br><br>Loading...</h3>";

	const res = await fetch("https://api.ournicerver.com/naver", {
		method: "GET"
	});
	const resdata = await res.json();
	const top10 = resdata.top10;
	let ltag = document.createElement("div");

	tag.innerHTML = "<br><br>";
	tag.appendChild(ltag);


	for (let k of top10) {
		let ntag = document.createElement("a");
		ntag.innerHTML = `
        <div class="naver_topic_index">
          <h3><a href="https://search.naver.com/search.naver?query=${encodeURI(k.keyword)}" style="color : black;">${k.rank}위. ${k.keyword}</a><br><br><h3>
        </div>
        `;
		ltag.appendChild(ntag);
	}
}


async function gettrendingtopicsnewsatnaverbyenmirynet() {
	let tag = document.getElementById("trending_topics_news");
	tag.innerHTML = "<h3><br><br>Loading...</h3>";

	const res = await fetch("https://api.ournicerver.com/naver", {
		method: "GET"
	});
	const resdata = await res.json();
	const news = resdata.articles;
	let ltag = document.createElement("div");

	tag.innerHTML = "<br><br>";
	tag.appendChild(ltag);


	for (let k of news) {
		let ntag = document.createElement("a");
		let nntag = document.createElement("div");
		ntag.setAttribute("class", "search");
		ntag.setAttribute("href", `${k.link}`);
		ntag.innerHTML = `<br>
<img crossorigin="anonymous" src="${("https://api.ournicerver.com/image?link=" + encodeURI(k.image))}" width="230px" height="230px">
        <div class="news-title" style="color: blue; font-size: 20px;">
          ${i}위. ${k.title}
        </div>
        <div class="search-desc" style="color: black; font-size: 16px;">
          <br>${k.desc}
        </div>
        <br>
        `;
		nntag.innerHTML = `
	───────────────────
 			`;
		ltag.appendChild(ntag);
		ltag.appendChild(nntag);
		i += 1;
	}
}