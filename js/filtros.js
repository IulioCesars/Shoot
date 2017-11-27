var filtros = ( function () {


    var canvas;
    var context;

    // API
    public = {};

    public.definirCanvas = function (canvasname) {
        canvas = document.getElementById( canvasname );
        context = canvas.getContext( '2d' );
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    public.definirFondo = function (canvasname) {
        var tema = localStorage.getItem("tema");
        filtros.definirCanvas(canvasname)
        filtros.cargarImagen("img/fondo.jpg", tema);
    };

    // Public methods goes here...
    public.cargarImagen = function (path, filtro) {
        var imageObj = new Image();
        imageObj.src = path;

        imageObj.onload = function () {
            //context.drawImage( imageObj, 0, 0 );
            context.drawImage(imageObj, 
                                0, 0, 
                                imageObj.width,
                                imageObj.height,
                                0, 0, 
                                canvas.width, 
                                canvas.height);
            switch(filtro){
                case "bw": { filtros.filters.bw(); break; }
                case "invert": { public.filters.invert(); break; }
                case "sepia": { public.filters.sepia(); break; }
                case "contrast": { public.filters.contrast(); break; }
            }
        }
    };

    public.getImgData = function () {
        return context.getImageData( 0, 0, canvas.width, canvas.height );
    };


    // Filters
    public.filters = {};

    public.filters.bw = function () {
        var imageData = filtros.getImgData(),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height;

        for ( var i = 0; i < numPixels; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];

            var grey = ( r + g + b ) / 3;

            pixels[ i * 4 ] = grey;
            pixels[ i * 4 + 1 ] = grey;
            pixels[ i * 4 + 2 ] = grey;
        }

        context.putImageData( imageData, 0, 0 );
    };


    public.filters.invert = function () {
        var imageData = filtros.getImgData(),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height;

        for ( var i = 0; i < numPixels; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];

            pixels[ i * 4 ] = 255 - r;
            pixels[ i * 4 + 1 ] = 255 - g;
            pixels[ i * 4 + 2 ] = 255 - b;
        }

        context.putImageData( imageData, 0, 0 );
    };

    public.filters.sepia = function () {
        var imageData = filtros.getImgData(),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height;

        for ( var i = 0; i < numPixels; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];

            pixels[ i * 4 ] = 255 - r;
            pixels[ i * 4 + 1 ] = 255 - g;
            pixels[ i * 4 + 2 ] = 255 - b;

            pixels[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
            pixels[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
            pixels[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
        }

        context.putImageData( imageData, 0, 0 );
    };


    public.filters.contrast = function ( contrast ) {
        var imageData = filtros.getImgData(),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height,
            factor;

        contrast || ( contrast = 100 ); // Default value

        factor = ( 259 * ( contrast + 255 ) ) / ( 255 * ( 259 - contrast ) );

        for ( var i = 0; i < numPixels; i++ ) {
            var r = pixels[ i * 4 ];
            var g = pixels[ i * 4 + 1 ];
            var b = pixels[ i * 4 + 2 ];

            pixels[ i * 4 ] = factor * ( r - 128 ) + 128;
            pixels[ i * 4 + 1 ] = factor * ( g - 128 ) + 128;
            pixels[ i * 4 + 2 ] = factor * ( b - 128 ) + 128;
        }

        context.putImageData( imageData, 0, 0 );
    };

    public.save = function () {
        var link = window.document.createElement( 'a' ),
            url = canvas.toDataURL(),
            filename = 'screenshot.jpg';

        link.setAttribute( 'href', url );
        link.setAttribute( 'download', filename );
        link.style.visibility = 'hidden';
        window.document.body.appendChild( link );
        link.click();
        window.document.body.removeChild( link );
    };

    return public;
    } () );