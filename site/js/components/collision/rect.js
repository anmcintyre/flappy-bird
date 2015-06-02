var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x + sizeA.x ;
    var rightA = positionA.x + sizeA.x + sizeA.width;
    var bottomA = positionA.y + sizeA.y;
    var topA = positionA.y + sizeA.y + sizeA.height;

    var leftB = positionB.x + sizeB.x ;
    var rightB = positionB.x + sizeB.x  + sizeB.width;
    var bottomB = positionB.y + sizeB.y;
    var topB = positionB.y + sizeB.y + sizeB.height;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;