using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AeroGear.OTP
{

    public class Clock
    {

        private readonly int interval;

        public Clock()
        {
            interval = 30;
        }

        public Clock(int interval)
        {
            this.interval = interval;
        }

        public virtual long CurrentInterval
        {
            get
            {
				 DateTime Jan1st1970 = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                long equivalente = (long)(DateTime.UtcNow - Jan1st1970).TotalMilliseconds / 1000;
                return equivalente / interval;
				
                //long currentTimeSeconds = DateTime.Now.Ticks / TimeSpan.TicksPerMillisecond / 1000;
                //return currentTimeSeconds / interval;
            }
        }
    }
}
