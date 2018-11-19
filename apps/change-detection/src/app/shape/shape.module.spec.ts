import { ShapeModule } from './shape.module';

describe('ShapeModule', () => {
  let shapeModule: ShapeModule;

  beforeEach(() => {
    shapeModule = new ShapeModule();
  });

  it('should create an instance', () => {
    expect(shapeModule).toBeTruthy();
  });
});
