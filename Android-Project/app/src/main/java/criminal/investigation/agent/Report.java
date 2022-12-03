package criminal.investigation.agent;


public class Report {

    public String uid;
    public String name;
    public String photo;
    public String identity;
    public String gender;
    public int accuracy;
    public long time = System.currentTimeMillis();
    public boolean isRecognized;
    public boolean isCaught;


    public Report() {

    }

}