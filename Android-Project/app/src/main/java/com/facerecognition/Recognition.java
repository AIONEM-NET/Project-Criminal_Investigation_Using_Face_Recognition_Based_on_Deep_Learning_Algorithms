package com.facerecognition;

import androidx.annotation.NonNull;


public class Recognition {

    private String id;
    private String name;
    private Float distance;
    private Object extra;
    private String gender;

    public Recognition(final String id, final String name, final Float distance, String gender) {
        this.id = id;
        this.name = name;
        this.distance = distance;
        this.gender = gender;
        this.extra = null;
    }

    public String getId() {
        String recognition = toString();
        id = recognition.substring(recognition.indexOf("["), recognition.indexOf("]"));
        id = id.replace("[", "");
        id = id.replace("]", "");
        id = id.replace(" ", "");
        return id;
    }

    public String getName() {
        String recognition = toString();
        name = recognition.substring(recognition.indexOf("] "), recognition.indexOf(" ("));
        name = name.replace("] ", "");
        return name;
    }

    public String getGender() {
        String recognition = toString();
        gender = recognition.toLowerCase().contains("female") ? "FEMALE" : recognition.toLowerCase().contains("male") ? "MALE" : "";
        return gender;
    }

    public Float getDistance() {
        String recognition = toString();
        distance = Float.valueOf(recognition.substring(recognition.indexOf("("), recognition.indexOf(")")));
        return distance;
    }

    public void setExtra(Object extra) {
        this.extra = extra;
    }

    public Object getExtra() {
        return this.extra;
    }

    @NonNull
    @Override
    public String toString() {
        String resultString = "";

        if (id != null) {
            resultString += "[" + id + "]" +" ";
        }

        if(name != null) {
            resultString += name + " ";
        }

        if (distance != null) {
            resultString += String.format("(%.1f%%) ", distance * 100.0f) +" ";
        }

        if(gender != null) {
            resultString += gender + " ";
        }

        return resultString.trim();
    }

}
