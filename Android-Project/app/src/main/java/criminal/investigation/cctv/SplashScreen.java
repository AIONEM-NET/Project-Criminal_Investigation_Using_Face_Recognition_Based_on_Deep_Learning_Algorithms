package criminal.investigation.cctv;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import criminal.investigation.agent.LoginActivity;


public class SplashScreen extends AppCompatActivity {

    boolean isAgent = true;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {

                if(getPackageName().equals("criminal.investigation.agent")) {

                    Intent intent = new Intent(SplashScreen.this, LoginActivity.class);
                    startActivity(intent);

                }else {
                    Intent intent = new Intent(SplashScreen.this, MainActivity.class);
                    startActivity(intent);
                }

                finish();
            }
        },2500);

    }

}