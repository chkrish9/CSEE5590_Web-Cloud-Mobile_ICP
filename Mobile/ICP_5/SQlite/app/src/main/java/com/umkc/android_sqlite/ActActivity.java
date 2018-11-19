package com.umkc.android_sqlite;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.umkc.android_sqlite.db.SQLiteDB;
import com.umkc.android_sqlite.model.Contact;
import com.umkc.android_sqlite.R;

/**
 *
 */
public class ActActivity extends AppCompatActivity implements View.OnClickListener{

    private EditText personName;
    private EditText phone;

    private Button btnAdd, btnEdit, btnDelete;

    private SQLiteDB sqLiteDB;
    private Contact contact;

    public static void start(Context context){
        Intent intent = new Intent(context, ActActivity.class);
        context.startActivity(intent);
    }

    public static void start(Context context, Contact contact){
        Intent intent = new Intent(context, ActActivity.class);
        intent.putExtra(ActActivity.class.getSimpleName(), contact);
        context.startActivity(intent);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_act);

        personName = (EditText) findViewById(com.umkc.android_sqlite.R.id.personText);
        phone = (EditText) findViewById(com.umkc.android_sqlite.R.id.phoneText);

        btnAdd = (Button) findViewById(com.umkc.android_sqlite.R.id.btnAdd);
        btnEdit = (Button) findViewById(R.id.btnEdit);
        btnDelete = (Button) findViewById(R.id.btnDelete);

        btnAdd.setOnClickListener(this);
        btnEdit.setOnClickListener(this);
        btnDelete.setOnClickListener(this);

        contact = getIntent().getParcelableExtra(ActActivity.class.getSimpleName());
        if(contact != null){
            btnAdd.setVisibility(View.GONE);

            personName.setText(contact.getName());
            phone.setText(contact.getPhone());
        }else{
            btnEdit.setVisibility(View.GONE);
            btnDelete.setVisibility(View.GONE);
        }

        sqLiteDB = new SQLiteDB(this);
    }

    @Override
    public void onClick(View v) {
        if(v == btnAdd){
            contact = new Contact();
            contact.setName(personName.getText().toString());
            contact.setPhone(phone.getText().toString());
            // Fetching Return type as Boolean to check if the insertion is successful or not
            boolean isInsertSuccessful = sqLiteDB.create(contact);
            if(isInsertSuccessful){
                Toast.makeText(this, "Inserted!", Toast.LENGTH_SHORT).show();
            }else{
                Toast.makeText(this, "Sorry, Insertion failed, Try again later!", Toast.LENGTH_SHORT).show();
            }
            finish();
        }else if(v == btnEdit){
            contact.setName(personName.getText().toString());
            contact.setPhone(phone.getText().toString());
            boolean isUpdateSuccessful = sqLiteDB.update(contact);

            if(isUpdateSuccessful) {
                Toast.makeText(this, "Edited!", Toast.LENGTH_SHORT).show();
            }else{
                Toast.makeText(this, "Unable to edit, Try again later!", Toast.LENGTH_SHORT).show();
            }
            finish();
        }else if(v == btnDelete){
            boolean isDeleteSuccessful = sqLiteDB.delete(contact.getId());
            if(isDeleteSuccessful){
                Toast.makeText(this, "Deleted!", Toast.LENGTH_SHORT).show();
            }else{
                Toast.makeText(this, "Unable to delete, Try again later!", Toast.LENGTH_SHORT).show();
            }
            finish();
        }
    }

    // Navigate to Home Screen
    public void goToHome(View view){
            Intent intent = new Intent(ActActivity.this, MainActivity.class);
            startActivity(intent);
    }
}
