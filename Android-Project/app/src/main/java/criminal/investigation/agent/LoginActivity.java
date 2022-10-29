package criminal.investigation.agent;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import criminal.investigation.cctv.R;


public class LoginActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        FirebaseUser firebaseUser = FirebaseAuth.getInstance().getCurrentUser();

        if(firebaseUser != null) {
            Intent intent = new Intent(LoginActivity.this, CCTVCameraActivity.class);
            startActivity(intent);
            finish();
            return;
        }

        EditText edtEmail = (EditText) findViewById(R.id.edtEmail);
        EditText edtPassword = (EditText) findViewById(R.id.edtPassword);
        Button btnLogin = (Button) findViewById(R.id.btnLogin);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String email = edtEmail.getText().toString();
                String password = edtPassword.getText().toString();

                if(TextUtils.isEmpty(email)) {
                    Toast.makeText(getApplicationContext(), "Email required", Toast.LENGTH_SHORT).show();
                    edtEmail.setError("Email required");
                    return;
                }
                edtEmail.setError(null);

                if(TextUtils.isEmpty(password)) {
                    Toast.makeText(getApplicationContext(), "Password required", Toast.LENGTH_SHORT).show();
                    edtPassword.setError("Password required");
                    return;
                }
                edtPassword.setError(null);

                findViewById(R.id.progressBar).setVisibility(View.VISIBLE);

                FirebaseAuth.getInstance().signInWithEmailAndPassword(email, password).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {

                        FirebaseUser firebaseUser = task.getResult().getUser();

                        if(task.isSuccessful() && firebaseUser != null) {

                            if(firebaseUser.isEmailVerified()) {

                                findViewById(R.id.progressBar).setVisibility(View.INVISIBLE);

                                if("Agent".equalsIgnoreCase(firebaseUser.getDisplayName())) {

                                    Toast.makeText(getApplicationContext(), "Login successfully", Toast.LENGTH_LONG).show();

                                    Intent intent = new Intent(LoginActivity.this, CCTVCameraActivity.class);
                                    startActivity(intent);
                                    finish();

                                }else {

                                    FirebaseAuth.getInstance().signOut();

                                    Toast.makeText(getApplicationContext(), "You don't have Agent access", Toast.LENGTH_LONG).show();
                                    edtEmail.setError("Not an Agent's email");

                                }

                            }else {

                                firebaseUser.sendEmailVerification().addOnCompleteListener(new OnCompleteListener<Void>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Void> task) {

                                        FirebaseAuth.getInstance().signOut();

                                        findViewById(R.id.progressBar).setVisibility(View.INVISIBLE);

                                        Toast.makeText(getApplicationContext(), "Email is not verified", Toast.LENGTH_LONG).show();
                                        Toast.makeText(getApplicationContext(), "Check your email to verify your account first", Toast.LENGTH_LONG).show();
                                        edtEmail.setError("Email is not verified");

                                    }
                                });

                            }

                        }else {

                            findViewById(R.id.progressBar).setVisibility(View.INVISIBLE);

                            if(task.getException()  != null) {
                                Toast.makeText(getApplicationContext(), task.getException().getMessage(), Toast.LENGTH_LONG).show();
                            }else {
                                Toast.makeText(getApplicationContext(), "Login Failed, please try again", Toast.LENGTH_LONG).show();
                            }

                        }

                    }
                });

            }
        });

    }
}
