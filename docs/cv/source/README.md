# CV source

Generates the three portfolio CVs (EN / ES / CA) as one-page PDFs.

```bash
pip install weasyprint
python build.py          # writes out_en.pdf, out_es.pdf, out_ca.pdf
```

Edit the texts in the `L` dictionary at the top of `build.py` and the layout in the CSS inside `page()`.
Then copy the PDFs to `frontend/public/cv/CV_Carme_Medina_{EN,ES,CA}.pdf` (the site links to these)
and to `docs/cv/CV_Carme_Medina_visual_{EN,ES,CA}.pdf`.

Note for WeasyPrint 70: links inside `display: flex` containers are dropped from the PDF, so the
header rows use floats instead of flex.
