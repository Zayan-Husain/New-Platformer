class ytimer
{
	constructor(time) 
	{
		this.count = 0;
		this.timer_max = time;
	}
   finished()
	{
		var t = this;
		if (t.count >= t.timer_max)
		{
			t.count -= t.timer_max; 
			
			return true;
		}
		//incrament by delta
		t.count += (deltaTime/ 50);
		return false;
	}//end update
}//end class