// Order: Expression overrides Character //
var BEEPS;
var beep_sfx;

function getBeep(character, expression)
{
	var sound = BEEPS[character] ? (BEEPS[character][expression] ? BEEPS[character][expression] : (BEEPS[character]['DEFAULT'] ? BEEPS[character]['DEFAULT'] : null)) : null;
	return sound ? new ig.Sound('mods/undertale-sfx/vc/' + sound + '.ogg') : null;
}

ig.EVENT_STEP.SHOW_MSG.inject({
	beep: null,
	init: function()
	{
		this.parent(...arguments);
		this.beep = getBeep(this.person, this.charExpression.expression);
	},
	start: function()
	{
		beep_sfx = this.beep;
		this.parent();
	}
});

ig.MessageOverlayGui.Entry.inject({
	addMessage: function()
	{
		this.beepSound = beep_sfx ? beep_sfx : this.beepSound;
		return this.parent(...arguments);
	}
});

(async() => {
	BEEPS = await simplify.resources.loadJSON('mods/undertale-sfx/config.json');
})();