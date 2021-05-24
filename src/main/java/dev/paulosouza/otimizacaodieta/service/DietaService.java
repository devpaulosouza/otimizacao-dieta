package dev.paulosouza.otimizacaodieta.service;

import com.ampl.AMPL;
import com.ampl.DataFrame;
import dev.paulosouza.otimizacaodieta.dto.DietaRequest;
import dev.paulosouza.otimizacaodieta.dto.DietaResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class DietaService {

    public DietaResponse calculate(final DietaRequest dietaRequest) {
        try (AMPL ampl = new AMPL()) {
            this.buildDataFrame(ampl, dietaRequest);

            ampl.solve();

            return this.extractResponse(ampl);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private void buildDataFrame(AMPL ampl, DietaRequest dietaRequest) throws IOException {
        String modelUri = DietaService.getModelUri("dieta");

        ampl.read(modelUri);

        DataFrame dfAlimentos = this.getDataFrameAlimentos(dietaRequest);
        ampl.setData(dfAlimentos, "ALIMENTO");

        DataFrame dataFrameNutrientes = this.getDataFrameNutrientes(dietaRequest);
        ampl.setData(dataFrameNutrientes, "NUTRIENTE");

        DataFrame dfMatriz = new DataFrame(2, "NUTRIENTE", "ALIMENTO", "amt");

        dfMatriz.setMatrix(
                dietaRequest.getQuantidades(),
                dietaRequest.getNutrientes(),
                dietaRequest.getAlimentos()
        );

        ampl.setData(dfMatriz);
    }

    private DietaResponse extractResponse(AMPL ampl) {
        double[] listaDeCompras = ampl
                .getVariable("ListaCompra")
                .getValues()
                .getColumnAsDoubles("ListaCompra.val");

        double custoTotal = ampl
                .getObjective("CustoTotal")
                .value();

        DietaResponse dietaResponse = new DietaResponse();

        dietaResponse.setCustoTotal(custoTotal);
        dietaResponse.setListaDeCompras(listaDeCompras);
        return dietaResponse;
    }

    private DataFrame getDataFrameNutrientes(DietaRequest dietaRequest) {
        DataFrame df;
        df = new DataFrame(1, "NUTRIENTE");
        df.setColumn("NUTRIENTE", dietaRequest.getNutrientes());
        df.addColumn("n_min", dietaRequest.getMinimosNutriente());
        df.addColumn("n_max", dietaRequest.getMaximosNutriente());
        return df;
    }

    private DataFrame getDataFrameAlimentos(DietaRequest dietaRequest) {
        DataFrame df = new DataFrame(1, "ALIMENTO");
        df.setColumn("ALIMENTO", dietaRequest.getAlimentos());
        df.addColumn("cost", dietaRequest.getCustos());
        df.addColumn("f_min");
        df.addColumn("f_max");
        df.setColumn("f_min", dietaRequest.getMinimosAlimento());
        df.setColumn("f_max", dietaRequest.getMaximosAlimento());
        return df;
    }

    public static String getModelUri(String filename) {
        try {
            return new ClassPathResource("model/"+filename+".mod")
                    .getURI()
                    .toString()
                    .replace("file:/","");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }


}
