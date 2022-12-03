package criminal.investigation.agent;

import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import criminal.investigation.cctv.R;


public class ReportViewHolder extends RecyclerView.ViewHolder {

    public TextView txtName;
    public TextView txtDescription;
    public Button btnStatus;
    public ImageView imgPhoto;

    public ReportViewHolder(@NonNull View itemView) {
        super(itemView);
        txtName = (TextView) itemView.findViewById(R.id.txtName);
        txtDescription = (TextView) itemView.findViewById(R.id.txtDescription);
        btnStatus = (Button) itemView.findViewById(R.id.btnStatus);
        imgPhoto = (ImageView) itemView.findViewById(R.id.imgPhoto);
    }

}