package com.umkc.firebase;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

public class Home extends AppCompatActivity {
    public DatabaseReference userd;
    public TextView txtName;
    public TextView txtPhone;
    FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        firebaseAuth = FirebaseAuth.getInstance();
        txtName = findViewById(R.id.txtName);
        txtPhone = findViewById(R.id.txtPhone);
        userd = FirebaseDatabase.getInstance().getReference("UserDetails");
        Query query = FirebaseDatabase.getInstance().getReference("UserDetails")
                .orderByChild("id")
                .equalTo(FirebaseAuth.getInstance().getUid());
        query.addListenerForSingleValueEvent(valueEventListener);
    }

    ValueEventListener valueEventListener = new ValueEventListener() {
        @Override
        public void onDataChange(DataSnapshot dataSnapshot) {
            if (dataSnapshot.exists()) {
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    UserDetailsModel userDetailsModel = snapshot.getValue(UserDetailsModel.class);
                    txtName.setText(userDetailsModel.name);
                    txtPhone.setText(userDetailsModel.phone);
                }
            }
        }

        @Override
        public void onCancelled(DatabaseError databaseError) {

        }
    };

    public void save(View view) {
        String name = txtName.getText().toString();
        String phone = txtPhone.getText().toString();

        if (!name.isEmpty() && !phone.isEmpty()) {
            String id = FirebaseAuth.getInstance().getUid();
            UserDetailsModel userDetailsModel = new UserDetailsModel(id, name, phone);
            userd.child(id).setValue(userDetailsModel);
            Toast.makeText(this, "Saved Successfully.", Toast.LENGTH_LONG).show();
        }else{
            Toast.makeText(this, "Please fill all the details and save.", Toast.LENGTH_LONG).show();
        }
    }

    public void logout(View view) {
        // Get the User
        FirebaseUser firebaseUser = firebaseAuth.getCurrentUser();
        if(firebaseUser != null){
            firebaseAuth.signOut();
            Intent intent = new Intent(Home.this, Login.class);
            startActivity(intent);
        }
    }
}
