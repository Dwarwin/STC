    $.ajax({
        type: 'GET',
        url: 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=18c06adab709459cbe5249dd557abb6a',
        data: {get_param: 'value'},
        dataType: 'json',
        success: function (data) {

            let articles = data.articles,
                news = '';
            articles.slice(0, 3).forEach(s => news +=
                `<article class="col-md-4">
                        <img class="img-responsive newsImg" src="${s.urlToImage}" alt="News image"/>
                        <h3>${s.title}</h3>
                        <p>${s.description}</p>
                        <a href="http://www.facebook.com/sharer.php?u=${s.url}" target="_blank">
                            <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
                        </a>
                        
                        <a href="https://plus.google.com/share?url=${s.url}" target="_blank">
                            <img src="https://simplesharebuttons.com/images/somacro/google.png" alt="Google" />
                        </a>
                    
                        <a href="https://twitter.com/share?url=${s.url};text=&amp;hashtags=" target="_blank">
                            <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
                        </a>
                        <a class="btn btn-default newsDetails" href="${s.url}" target="_blank" role="button">View 
                        details &raquo;</a>
                     </article>`);

            if (!news) {
                news = `<h4>No news for you today</h4>`
            }

            $('.newsList').html(news);

        }
    });