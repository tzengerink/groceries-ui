'use strict';

describe('CONFIG', function() {
    var CONFIG;

    beforeEach(angular.mock.module('groceries'));

    beforeEach(inject(function($injector) {
        CONFIG = $injector.get('CONFIG');
    }));

    it('should contain a `api` configuration', function() {
        expect(CONFIG.api).not.toBe(undefined);
    });
});
