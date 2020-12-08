import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React from "react";
import { store } from "..";
import { SavePdfIcon } from "../images";
export const PdfGenerator = () => {

    const exportPdf = async () => {
        const jsPdf = new jsPDF("p", "mm", "a4", true);
        let canvas: HTMLCanvasElement;
        const container = Array.from(document.querySelectorAll(".pdf-container"));
        for (let i = 0; i < container.length; i++) {
            if (i > 0) {
                jsPdf.addPage();
            }
            // tslint:disable-next-line: await-promise
            canvas = await html2canvas(container[i] as unknown as HTMLElement, { scale: 4, letterRendering: true });
            jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());

        }
        jsPdf.save(`${store.getState().Title}.pdf`);
    };

    return <div id="pdf-generator" className="pdf-generator">
        <img
            src={SavePdfIcon}
            style={{ left: "150px" }}
            className="toolbar-icon"
            id={"pdf-generator-icon"}
            title={"Generate a PDF file from this list"}
            alt={"GeneratePdfIcon"}
            onClick={exportPdf}>
        </img>
    </div>;
};
