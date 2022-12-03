package criminal.investigation.agent;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;

import java.util.ArrayList;
import java.util.Date;

import criminal.investigation.cctv.R;


public class ReportsAdapter extends RecyclerView.Adapter<ReportViewHolder> {

    private Context context;
    private ArrayList<Report> listReports;

    public ReportsAdapter(Context context, ArrayList<Report> listReports) {
        this.context = context;
        this.listReports = listReports;
    }

    @NonNull
    @Override
    public ReportViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ReportViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.row_report, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ReportViewHolder viewHolder, int position) {

        Report report = listReports.get(position);

        viewHolder.txtName.setText(report.name);
        viewHolder.txtDescription.setText(
                ""+
                        "ID: "+ report.identity
                        +"\nGender: "+ report.gender
                        +"\n"+ new Date(report.time).toLocaleString()
        );

        Glide
                .with(context)
                .load(report.photo)
                .centerCrop()
                .placeholder(R.drawable.logo_face)
                .into(viewHolder.imgPhoto);

        if(report.isRecognized) {

            viewHolder.btnStatus.setText(report.accuracy +" %");
            viewHolder.btnStatus.setBackgroundResource(R.drawable.oval);

        }else {

            viewHolder.btnStatus.setText(report.accuracy +" %");
            viewHolder.btnStatus.setBackgroundResource(R.drawable.oval_yellow);

            viewHolder.btnStatus.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {


                }
            });

        }

    }

    @Override
    public int getItemCount() {
        return listReports.size();
    }

    public void setListGarbage(ArrayList<Report> listReport) {
        this.listReports = listReport;
    }

}