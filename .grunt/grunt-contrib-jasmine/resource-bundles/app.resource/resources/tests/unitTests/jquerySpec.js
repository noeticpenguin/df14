
var __cov_W43rJ_gZqbLNQ70LEKSCmA = (Function('return this'))();
if (!__cov_W43rJ_gZqbLNQ70LEKSCmA.__coverage__) { __cov_W43rJ_gZqbLNQ70LEKSCmA.__coverage__ = {}; }
__cov_W43rJ_gZqbLNQ70LEKSCmA = __cov_W43rJ_gZqbLNQ70LEKSCmA.__coverage__;
if (!(__cov_W43rJ_gZqbLNQ70LEKSCmA['resource-bundles/app.resource/resources/tests/unitTests/jquerySpec.js'])) {
   __cov_W43rJ_gZqbLNQ70LEKSCmA['resource-bundles/app.resource/resources/tests/unitTests/jquerySpec.js'] = {"path":"resource-bundles/app.resource/resources/tests/unitTests/jquerySpec.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0},"b":{},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":35}}},"2":{"name":"(anonymous_2)","line":3,"loc":{"start":{"line":3,"column":49},"end":{"line":3,"column":59}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":10,"column":3}},"2":{"start":{"line":3,"column":1},"end":{"line":8,"column":4}},"3":{"start":{"line":4,"column":2},"end":{"line":4,"column":33}},"4":{"start":{"line":6,"column":2},"end":{"line":6,"column":37}},"5":{"start":{"line":7,"column":2},"end":{"line":7,"column":44}}},"branchMap":{}};
}
__cov_W43rJ_gZqbLNQ70LEKSCmA = __cov_W43rJ_gZqbLNQ70LEKSCmA['resource-bundles/app.resource/resources/tests/unitTests/jquerySpec.js'];
__cov_W43rJ_gZqbLNQ70LEKSCmA.s['1']++;describe('jQuery Tests',function(){__cov_W43rJ_gZqbLNQ70LEKSCmA.f['1']++;__cov_W43rJ_gZqbLNQ70LEKSCmA.s['2']++;it('loads a view fixture and tests against it',function(){__cov_W43rJ_gZqbLNQ70LEKSCmA.f['2']++;__cov_W43rJ_gZqbLNQ70LEKSCmA.s['3']++;loadFixtures('myfixture.html');__cov_W43rJ_gZqbLNQ70LEKSCmA.s['4']++;expect($('#foobar')).toBeDefined();__cov_W43rJ_gZqbLNQ70LEKSCmA.s['5']++;expect($('#foobar')).toContainText('baz');});});
