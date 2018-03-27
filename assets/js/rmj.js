/*
* @Author: d4r
* @Date:   2018-02-17 10:46:25
* @Last Modified by:   d4r
* @Last Modified time: 2018-02-17 11:27:10
*/

const api_url = 'http://localhost:8080/v2/'

function fetchFeeds () {
	return fetch(api_url+'feed')
		.then(response => response.json())
}

function generateHtmlTimeline (feed) {
	console.log('generateHtmlTimeline ', feed)
	const {content, datecreated} = feed
	return `
		<section>
			<span class="icon style2 major fa-diamond"></span>
			<h3>Lorem</h3>
			<p>${content}</p>
		</section>
	`
}

function buildTimeline (feeds) {
	const html = feeds
		.reduce((htmlFeeds, feed) => htmlFeeds += generateHtmlTimeline(feed), '')
	$('.rmj-timeline').html(html)
}

$(document).ready(function () {
	// fetch feeds
	fetchFeeds()
		.then(response => {
			const {data} = response
			buildTimeline(data)
		})
})