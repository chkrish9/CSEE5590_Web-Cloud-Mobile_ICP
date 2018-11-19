package com.umkc.android_sqlite.db;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.umkc.android_sqlite.model.Contact;


public class SQLiteDB extends SQLiteOpenHelper {


    public static final int DATABASE_VERSION = 3;
    public static final String DATABASE_NAME = "Contact.db";


    public static final String TABLE_NAME = "contact";
    public static final String COLUMN_ID = "contact_id";
    public static final String COLUMN_NAME = "contact_name";
    public static final String COLUMN_PHONE = "contact_phone";


    private static final String SQL_DELETE_ENTRIES =
            "DROP TABLE IF EXISTS " + TABLE_NAME;

    public SQLiteDB(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        //fill this method to create the database table
        // use the constants provided above
        db.execSQL("create table " + TABLE_NAME +" ("+ COLUMN_ID +" INTEGER PRIMARY KEY AUTOINCREMENT," +
                COLUMN_NAME+","+COLUMN_PHONE+")");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL(SQL_DELETE_ENTRIES);
        onCreate(db);
    }

    public void onDowngrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        onUpgrade(db, oldVersion, newVersion);
    }

    public boolean create(Contact contact){
        //fill this method to insert the row
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COLUMN_NAME,contact.getName());
        contentValues.put(COLUMN_PHONE,contact.getPhone());
        // Inserting the Data, Return Type will be 'long'
        long result = db.insert(TABLE_NAME,null ,contentValues);
        if(result == -1) {
            //If Insert haven't happened properly, it will return a "long" value '-1'
            // as Output
            return false;
        }
        else {
            // If Insertion is Successful
            return true;
        }

    }

    public Cursor retrieve(){
        SQLiteDatabase db = getReadableDatabase();
        String[] cols = {
                COLUMN_ID,
                COLUMN_NAME,
                COLUMN_PHONE };

        String sortOrder = COLUMN_NAME + " ASC";

        Cursor c = db.query(
                TABLE_NAME,                    // The table to query
                cols,                                 // The columns to return
                null,                                       // The columns for the WHERE clause
                null,                                       // The values for the WHERE clause
                null,                                       // don't group the rows
                null,                                       // don't filter by row groups
                sortOrder                                   // The sort order
        );

        return c;
    }

    public boolean update(Contact contact){
        //fill this method to update the row
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COLUMN_NAME,contact.getName());
        contentValues.put(COLUMN_PHONE,contact.getPhone());

        String filter = COLUMN_ID+"="+contact.getId();
        // Updating the Data, Return Type will be 'long'
        long result = db.update(TABLE_NAME,contentValues ,filter,null);
        if(result == -1) {
            //If Update haven't happened properly, it will return a "long" value '-1' as Output
            return false;
        }

        else {
            // If Update is Successful
            return true;
        }
    }

    public boolean delete(int id){
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        //fill this method to delete the row
        long result = db.delete(TABLE_NAME, COLUMN_ID+"="+id, null);
        if(result == -1) {
            //If delete haven't happened properly, it will return a "long" value '-1'
            // as Output
            return false;
        }
        else {
            // If Deletion is Successful
            return true;
        }
    }
}
