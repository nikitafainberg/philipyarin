var container, table, boolean;//, loader;

function init() {
    container = document.getElementById('container');
    // loader = new Worker('loader.js');
    getView('telaviv');
    getView('triangle');
    getView('blackAndWhite');
}

function getView(tableName) {
    $(document).ready(function () {
        $.getJSON('./data.json', function (data) {
            var images = new Array();
            var title = new Array();
            var size = new Array();
            var material = new Array();
            var year = new Array();
            $.each(data, function (object, massive) {
                if (object === tableName) {
                    $.each(massive, function (parent, child) {
                        $.each(child, function (key, value) {
                            switch (key) {
                                case 'url':
                                    images.push(value);
                                    break;
                                case 'title':
                                    title.push(value);
                                    break;
                                case 'size':
                                    size.push(value);
                                    break;
                                case 'material':
                                    material.push(value);
                                    break;
                                case 'year':
                                    year.push(value);
                                    break;
                            }
                        });
                    });
                }
            });
            createGallery(images, title, size, material, year, tableName);
            imageClicked();
        });
    });
}

function changeView(btn) {
    clean();
    table = document.getElementById(btn).style.visibility = 'visible';
}

function aboutView() {
    clean();
    document.getElementById('about').style.visibility = 'visible';
}

function clean() {
    if($('#lightBox').length > 0) {
        $('#menu').animate({right: '-=140'}, 500);
        $('#lightBoxHolder').remove();
        $('#container').width('65%');
    }

    var elements = container.children;
    for (var i = 0; i < elements.length; i++){
        elements[i].style.visibility = 'hidden';
    }
}

function createGallery(images, title, size, material, coast, tableName) {
    var imageTable = document.createElement('table');
    imageTable.id = tableName;
    imageTable.style.visibility = 'hidden';
    imageTable.style.width = '65%';
    imageTable.style.position = 'absolute';
    imageTable.style.right = '50px';
    var count = 0;
    imageTable.border = 0;
    // alert(imageTable.offsetWidth);

    for(var i = 0; i < images.length / 3; i++){
        var tr = document.createElement('tr');
        for (var n = 0; n < 3; n++){
            var td = document.createElement('td');
            td.style.verticalAlign = 'top';
            td.style.marginRight = '30px';
            td.style.textAlign = 'center';
            td.style.width = '30%';


            var img = document.createElement('img');

            img.style.marginBottom = '10px';
            img.src = images[count];

            if (images[count]) {
                var pTitle = document.createElement('p');
                var pSize = document.createElement('p');
                var pMaterial = document.createElement('p');
                var pCoast = document.createElement('p');

                td.appendChild(img);

                if (title[count]) {
                    pTitle.appendChild(document.createTextNode(title[count]));
                    pTitle.style.marginTop = '-5px';
                    pSize.appendChild(document.createTextNode(size[count]));
                    pSize.style.marginTop = '-10px';
                    pMaterial.appendChild(document.createTextNode(material[count]));
                    pMaterial.style.marginTop = '-10px';
                    pCoast.appendChild(document.createTextNode(coast[count]));
                    pCoast.style.marginTop = '-10px';
                    td.appendChild(pTitle);
                    td.appendChild(pSize);
                    td.appendChild(pMaterial);
                    td.appendChild(pCoast);
                }
            }

            tr.appendChild(td);
            count++;
        }
        imageTable.appendChild(tr);
    }
    container.appendChild(imageTable);

}

function openSubMenu(str) {
    if (str == 'paint'){
        $('#paint').slideToggle('slow');
    }else {
        $('#draw').slideToggle('slow');
    }
}
function imageClicked() {
    $(document).ready(function () {
        $('img').click(function () {
            $src = $(this).attr('src');
            if (!$('#lightBox').length > 0){

                $('#menu').animate({right: '+=140'}, 350);
                $('#container').width($(window).width() - $('#menu').width() - 50);
                $('#container').append('<div id="lightBoxHolder" style="height:100%"><div id="lightBox"><img src=""/></div></div>');
                $('#lightBox').width($('#container').width());
                $('#lightBox img').attr('src', $src);
                $('#lightBox img').width('80%');

                $('#lightBox img').css({
                    margin: 'auto',
                    top: '8%',
                    left: '10%',
                    position: 'absolute'
                });

                var h = $('#lightBox img').height();

                $('#lightBox').height(h + 300);

                $('#lightBox').click(function () {
                    $('#menu').animate({right: '-=140'}, 350);
                    $('#lightBoxHolder').remove();
                    $('#container').width('65%');
                });

                $('#lightBox').show();
            }
        });
    });
}