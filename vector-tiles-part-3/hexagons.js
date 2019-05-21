HexDefinition = function (edgeSize) {

    this.h = Math.sin(30.0 * Math.PI / 180) * edgeSize;
    this.r = Math.cos(30.0 * Math.PI / 180) * edgeSize;
    this.b = edgeSize + 2.0 * this.h;
    this.a = 2.0 * this.r;

    this.edgeSize = edgeSize;
    this.narrowWidth = this.edgeSize + this.h;
    this.diameter = this.b;
    this.height = this.a;

    function _mapSize(levelOfDetail) {
        return 256 << levelOfDetail;
    }

    function _clip(n, minValue, maxValue) {
        return Math.min(Math.max(n, minValue), maxValue);
    }

    /**
     * Returns the center XY coordinates of the specified hexagon
     * @param u
     * @param v
     * @returns {{x: number, y: number}}
     */
    this.getCenterPointXY = function (u, v) {

        var x = this.narrowWidth * u;
        var y = this.height * (u * 0.5 + v);

        return { x: x, y: y };
    };

    this.pixelXYToLatLong = function (pixelX, pixelY, levelOfDetail) {
        var mapSize = _mapSize(levelOfDetail);
        var x = (_clip(pixelX, 0, mapSize - 1) / mapSize) - 0.5;
        var y = 0.5 - (_clip(pixelY, 0, mapSize - 1) / mapSize);

        return {
            latitude: 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI,
            longitude: 360 * x
        }
    };
        
};