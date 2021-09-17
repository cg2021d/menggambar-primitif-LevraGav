function main() 
{
    /**
     * @type {HTMLCanvasElement} canvas
     */
    const canvas = document.getElementById('myCanvas-segitiga-triangle-strip');

    /**
     * @type {WebGLRenderingContext} gl
     */
    const gl = canvas.getContext('webgl');

    // Mendefinisikan posisi titik" tersebut
    /**
     * A (-0.5, 0.5)
     * B (-0.5, -0.5)
     * C (0.5, -0.5)
     */

    //* Didefinisikan titik"nya aja
    var vertices = [
        -0.5,
        0.5, //titik A
        -0.5,
        -0.5, //titik B
        0.5,
        -0.5, //titik C
    ];

    // Bikin buffer, terus ngeassign vertices ke buffer
    // kalo udah, di unbind lagi
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    const vertexShaderCode = document.getElementById(
        'vertexShaderCode-segitiga-triangle-strip'
    ).textContent;

    // membuat titik"
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    const fragmentShaderCode = document.getElementById(
        'fragmentShaderCode-segitiga-triangle-strip'
    ).textContent;

    // membuat fragment warna
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // membuat program agar data bisa ditampilkan
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Clear existing canvas first
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // name `a_position` sesuai dengan vertexShaderCode
    const aPosition = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // Clear existing canvas first
    gl.clearColor(0.13, 0.13, 0.13, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // * Karena pake loop, jadi cuma butuh titiknya aja
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
}

main();
