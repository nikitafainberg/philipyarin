function createGallery(images, title, size, material, coast, tableName) {
    var imageTable = document.createElement('table');
    imageTable.id = tableName;
    imageTable.style.visibility = 'hidden';

    var count = 0;
    imageTable.border = 0;

    for(var i = 0; i < images.length / 3; i++){
        var tr = document.createElement('tr');
        for (var n = 0; n < 3; n++){
            var td = document.createElement('td');
            td.style.verticalAlign = 'top';
            td.style.marginRight = '30px';
            td.style.textAlign = 'center';

            var img = document.createElement('img');

            img.height = 200;
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
        imageTable.style.width = '65%';
        imageTable.style.position = 'absolute';
        imageTable.style.right = '50px';
    }
    container.appendChild(imageTable);
    imageClicked();
}