var page = 1;
var ver = 0;

$(document).ready(function() {

    filmes(page);

    $(window).scroll(function() {
          if ($(this).scrollTop() + $(this).height() >= $(document).height() - 400) {
            var offset = $('#result > div').length;
            
            if(offset > ver){
                page = page + 1;
                filmes(page);
                console.log("Aqui: "+page);
                ver = offset;
            }       
          } // fim do if
    }); // fim scroll

});


function filmes(page){
    $.ajax({
        url:'https://api.themoviedb.org/3/discover/movie', //Página PHP que seleciona postagens
        type:'GET', // método post, GET ...
        data: "api_key=49453ddd24d2109cbd2875df16cdd76f&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page+"&with_watch_monetization_types=flatrate", //seus paramêtros
        success: function(data){ // sucesso de retorno executar função
            
                var cont = 0;
                var htm = "";
                $.each(data['results'], function( p, item ){

                        htm += "<div class='col-2'>";
                        htm += "<div class='bloco'>";

                        htm += "<img src='https://image.tmdb.org/t/p/original/"+item.poster_path+"' class='img-fluid' >";
                        htm += "<span style='font-size: 12px;' >"+item.title+"</span>";

                        htm += "</div>";
                        htm += "</div>";

                });

                console.log("Aqui: "+page);
                if(page == 1){
                    $("#result").html(htm);
                }else{
                    $('#result').append(htm); // adiciona o resultado na div #conteudo
                }


        } // fim success
     }); // fim ajax
}