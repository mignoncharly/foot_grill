# Foot Grill

Django application for organizing a grill event, including pages, participants, and event information.

## Repository structure

Project configuration is in grillparty_project/; the event application is in grillparty/.

## Local development

Prerequisites: Python 3 and any database services declared by the project settings.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Keep credentials outside Git. When an environment example is present, copy it to .env and replace every placeholder locally.

## Repository hygiene

- Do not commit credentials, local environment files, virtual environments, generated caches, or build output.
- Keep project documentation factual and update it alongside behavioral or deployment changes.
- Preserve database and project-data files unless their removal has been reviewed separately.
