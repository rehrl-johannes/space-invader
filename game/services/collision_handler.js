// singleton design pattern

export const CollisionHandler = (function () {
    let collisions;

    function getCollisions(objects) {
        let result = [];
        for (let i = 0; i < objects.length; i++) {
            for(let k = i + 1; k < objects.length; k++) {
                if(!(((objects[i].position.y + objects[i].image.height) < (objects[k].position.y)) ||
                    (objects[i].position.y > (objects[k].position.y + objects[k].image.height)) ||
                    ((objects[i].position.x + objects[i].image.width) < objects[k].position.x) ||
                    (objects[i].position.x > (objects[k].position.x + objects[k].image.width))
                )) {
                    result.push({obj1: objects[i], obj2: objects[k]});
                }
            }
        }

        return result;
    }

    // public
    return {
        handleCollision: function (objects) {
            collisions = getCollisions(objects);

            collisions.forEach(collision => {
                collision.obj1.collide(collision.obj2);
                collision.obj2.collide(collision.obj1);
            });

            collisions = [];
        }
    };
})();