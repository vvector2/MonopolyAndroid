import{ Field, FieldFactory } from "./Fields";
import {canvasHeight, canvasWidth} from "./Helper"

export const VERTICAL_FIELD_SIZE = { w: 0.081521739 * canvasWidth, h:0.149* canvasHeight };
export const HORIZONTAL_FIELD_SIZE ={ w: 0.149 * canvasWidth, h: 0.081521739 * canvasHeight };
export const BIG_FIELD_SIZE = { w: 0.149 * canvasWidth, h: 0.149 * canvasHeight };
export const DIRECTIONS = {
  UP: 1,
  LEFT: 2,
  DOWN: 3,
  RIGHT: 4,
}
export const HOUSE_SIZE = { w: 10, h: 10 };
export class MonopolyBoard  {
  constructor() {
    this.fields = this._getFieldsPositions();
  }
  _getFieldsPositions() {
    let fields = [];
    const fieldFactory = new FieldFactory();
    fields[0] = new Field(0, 0, BIG_FIELD_SIZE.w, BIG_FIELD_SIZE.h, 0);
    for (let j = 1; j < 40; j++) {
      let x = this._getNextFieldX(fields[j - 1],this._getDirection(j),this._getFieldSize(j));
      let y = this._getNextFieldY(fields[j - 1],this._getDirection(j),this._getFieldSize(j));
      let w = this._getFieldSize(j).w;
      let h = this._getFieldSize(j).h;
      fields[j] = fieldFactory.getField(x,y,w,h,j);
    }
    return fields;
  }
  _getNextFieldX(field, direction, nextFieldSize) {
    if (direction === DIRECTIONS.LEFT) {
      return field.x - nextFieldSize.w;
    }
    if (direction === DIRECTIONS.RIGHT) {
      return field.x + field.w;
    }
    return field.x;
  }

  _getNextFieldY(field, direction, nextFieldSize) {
    if (direction === DIRECTIONS.UP) {
      return field.y - nextFieldSize.h;
    }
    if (direction === DIRECTIONS.DOWN) {
      return field.y + field.h;
    }
    return field.y;
  }

  _getDirection(fieldNum) {
    if (fieldNum <= 10) return DIRECTIONS.RIGHT;
    if (fieldNum <= 20) return DIRECTIONS.DOWN;
    if (fieldNum <= 30) return DIRECTIONS.LEFT;
    if (fieldNum <= 40) return DIRECTIONS.UP;
  }

  _getFieldSize(fieldNum) {
    if (
      fieldNum === 0 ||
      fieldNum === 10 ||
      fieldNum === 20 ||
      fieldNum === 30
    ) {
      return BIG_FIELD_SIZE;
    }
    if (fieldNum < 10)//top row
      return VERTICAL_FIELD_SIZE;

    if (fieldNum > 10 && fieldNum < 20)//right column
      return HORIZONTAL_FIELD_SIZE;

    if (fieldNum > 20 && fieldNum < 30)//bot row
      return VERTICAL_FIELD_SIZE;

    return HORIZONTAL_FIELD_SIZE;//left column
  }
  getFieldCenter(id) {
    //console.log(canvasWidth);
    //console.log(canvasHeight);
    //console.log(this.fields);
    const field = this.fields[id];
    const fieldSize = this._getFieldSize(id);
    return {x : field.x +fieldSize.w /2 , y : field.y + fieldSize.h/2 };
  }
  getfieldById(id){return this.fields[id];}

  getHouseCoord(id) {
    const field = this.fields[id];
    const direction = this._getDirection(id);

    if (direction === DIRECTIONS.RIGHT) {
      return {x:field.x + (field.w/2) -(HOUSE_SIZE.w/2) , y : field.y + field.h - (HOUSE_SIZE.h/2)  };
    }
    else if (direction === DIRECTIONS.DOWN) {
      return {x:field.x -(HOUSE_SIZE.w/2), y : field.y + (field.h/2) - (HOUSE_SIZE.h/2)  };
    }
    else if (direction === DIRECTIONS.UP) {
      return {x:field.x + field.w -(HOUSE_SIZE.w/2) , y : field.y + (field.h/2) - (HOUSE_SIZE.h/2) };
    }
    else if (direction === DIRECTIONS.LEFT) {
      return {x:field.x + (field.w/2) -(HOUSE_SIZE.w/2) , y : field.y - (HOUSE_SIZE.h/2)  };
    }
  }
}
