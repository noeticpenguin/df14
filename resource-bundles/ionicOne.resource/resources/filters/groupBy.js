angular.module('ionicOne').filter('groupBy', function() {
	return function(list, group_by) {
		var filtered = [];
		var prev_item = null;
		var group_changed = false;
		// this is a new field which is added to each item where we append "_CHANGED"
		// to indicate a field change in the list
		var new_field = group_by + '_CHANGED';
		// loop through each item in the list
		angular.forEach(list, function(item) {
			group_changed = false;
			// if not the first item
			if (prev_item !== null) {
				// check if the group by field changed
				if (prev_item[group_by] !== item[group_by]) {
					group_changed = true;
				}
				// otherwise we have the first item in the list which is new
			} else {
				group_changed = true;
			}
			// if the group changed, then add a new field to the item
			// to indicate this
			if (group_changed) {
				item[new_field] = true;
			} else {
				item[new_field] = false;
			}
			filtered.push(item);
			prev_item = item;
		});
		return filtered;
	};
})