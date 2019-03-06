import { HybridAppModule } from './hybrid-app.module';

describe('HybridAppModule', () => {
  let hybridAppModule: HybridAppModule;

  beforeEach(() => {
    hybridAppModule = new HybridAppModule();
  });

  it('should create an instance', () => {
    expect(hybridAppModule).toBeTruthy();
  });
});
