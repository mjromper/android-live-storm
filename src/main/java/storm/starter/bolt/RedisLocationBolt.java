package storm.starter.bolt;

import java.util.List;
import org.json.simple.JSONObject;

import twitter4j.Status;

/**
 * 
 * Publish the geolocation coming from the different tweets.
 * 
 * @author MRomero2
 *
 */
public class RedisLocationBolt extends RedisBolt {
	
	public static final String CHANNEL = "geolocation";
	
	public RedisLocationBolt() {
		super(CHANNEL);
	}

	@Override
	public List<Object> filter(Status original) {
            
                if (original.getGeoLocation() == null){
                    return null;
                }
                
		JSONObject msg = new JSONObject();
		msg.put("user", original.getUser().getScreenName());
		msg.put("photo", original.getUser().getProfileImageURL().toString());
		msg.put("tweet", original.getText());
		msg.put("id", original.getId());
                JSONObject geolocation = new JSONObject();
                geolocation.put("latitude", original.getGeoLocation().getLatitude());
                geolocation.put("longitude", original.getGeoLocation().getLongitude());
                msg.put("geolocation", geolocation);
		publish(msg.toJSONString());		
		
		return null;
	}
}
