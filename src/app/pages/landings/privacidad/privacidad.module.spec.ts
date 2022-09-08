import { PrivacidadModule } from './privacidad.module';

describe('PrivacidadModule', () => {
  let privacidadModule: PrivacidadModule;

  beforeEach(() => {
    privacidadModule = new PrivacidadModule();
  });

  it('should create an instance', () => {
    expect(privacidadModule).toBeTruthy();
  });
});
