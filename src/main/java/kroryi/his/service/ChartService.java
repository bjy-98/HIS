package kroryi.his.service;


import kroryi.his.domain.ChartMemo;
import kroryi.his.domain.MedicalChart;
import kroryi.his.dto.MedicalChartDTO;
import kroryi.his.dto.MedicalChartSearchDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface ChartService {

    //자주사용하는 문구 저장용
    ChartMemo saveMemo(ChartMemo memo);

    //자주 사용하는 문구 출력용
    List<ChartMemo> getAllMedicalChartsMemo();

    List<MedicalChart> getChart(String chartNum);

    List<MedicalChart> PLANChart(String chartNum, String medicalDivision);

    MedicalChartDTO addMedicalChart(MedicalChartDTO dto);

    MedicalChartDTO addMedicalChart(List<List<String>> piList, String paName, String chartNum);

    MedicalChartDTO MedicalChartSave(MedicalChartDTO dto);

    MedicalChart MedicalChartUpdate(MedicalChartDTO dto);

    MedicalChartDTO deleteChart(String charNum, String paName, String teethNum, String plan);

    void deleteChart(Integer cnum);

    //    List<MedicalChart> searchMedicalCharts(MedicalChartSearchDTO medicalChartSearchDTO);
//    List<MedicalChart> searchMedicalCharts(String chartNum, List<String> teethNums, LocalDate mdTimeStart, LocalDate mdTimeEnd);
    List<MedicalChart> searchMedicalCharts(MedicalChartSearchDTO searchDTO);
}
