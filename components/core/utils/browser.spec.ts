import { isAndroid, isIOS, isPlatform } from './browser';

describe('#isPlatform', () => {
  it('when is android', () => {
    document.querySelector('body')?.setAttribute('data-platform', 'android');
    expect(isPlatform('android')).toBe(true);
  });
  it('when is ios', () => {
    document.querySelector('body')?.setAttribute('data-platform', 'ios');
    expect(isPlatform('ios')).toBe(true);
  });
});

it('#isAndroid', () => {
  document.querySelector('body')?.setAttribute('data-platform', 'android');
  expect(isAndroid()).toBe(true);
});

it('#isIOS', () => {
  document.querySelector('body')?.setAttribute('data-platform', 'ios');
  expect(isIOS()).toBe(true);
});
