import { CondicionesModule } from './condiciones.module';

describe('CondicionesModule', () => {
  let condicionesModule: CondicionesModule;

  beforeEach(() => {
    condicionesModule = new CondicionesModule();
  });

  it('should create an instance', () => {
    expect(condicionesModule).toBeTruthy();
  });
});
