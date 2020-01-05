var undertalesfx;

export default class UndertaleSFX extends Plugin
{
	/*
	[Field Variables]
	- BEEPS (Object): Determine the beep sound to use based on the character and their expression. Expression overrides Character.
	- beep (Object): The ig.Sound object used for the beep.
	This code is super ghetto compared to the Voice Mod. Refer to that and the comments there.
	*/
	
	constructor(mod)
	{
		super(mod);
		this.mod = mod;
		undertalesfx = this;
	}
	
	async preload() {}
	async postload() {}
	async prestart() {}
	
	async main()
	{
		this.BEEPS = await simplify.resources.loadJSON(this.mod.baseDirectory.substring(7) + 'vc/config.json');
		
		ig.EVENT_STEP.SHOW_MSG.inject({
			beep: null,
			init: function()
			{
				this.parent(...arguments);
				this.beep = undertalesfx.getBeep(this.person, this.charExpression.expression);
			},
			start: function()
			{
				undertalesfx.beep = this.beep;
				this.parent();
			}
		});
		
		ig.MessageOverlayGui.Entry.inject({
			addMessage: function()
			{
				this.beepSound = undertalesfx.beep ? undertalesfx.beep : this.beepSound;
				return this.parent(...arguments);
			}
		});
	}
	
	getBeep(character, expression)
	{
		var Z = undertalesfx.BEEPS;
		var sound = Z[character] ? (Z[character][expression] ? Z[character][expression] : (Z[character]['DEFAULT'] ? Z[character]['DEFAULT'] : null)) : null;
		return sound ? new ig.Sound(this.mod.baseDirectory.substring(7) + 'vc/' + sound + '.ogg') : null;
	}
}