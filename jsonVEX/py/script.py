import pandas as pd
import json
# from openpyxl import load_workbook
import xlwings as xw
from win32com.client import constants

## Config
try:
    with open("config.json") as f:
        config = json.load(f)
except FileNotFoundError:
    config = {
        "excel_path": "TournamentData.xlsx",
        "excel_save": "JudgeAvailabilityHelper.xlsm",
        "match_time": {
            "m": 3,
            "s": 30
        },
        "preparation_time": 6,
        "interview_time": 3,
        "open_on_script": True,

        "use_number": True,
        "folder-sheets": "./data/",
        "folder-jsons": "./json/",
        "sheets": ["V5-Division-1", "V5-Division-2", "IQ-Division-1", "IQ-Division-2"]
    }


sheet_name_matches = 'Matches'
sheet_name_teams = 'Teams'
if config["use_number"]:
    team_id = "Number"
else:
    team_id = "Name"

excel_files = config["sheets"]
df_list = []

## Read the Excel sheet into a pandas DataFrame
for f in excel_files:
    file = config["folder-sheets"] + f + ".xlsx"
    print(file)
    try:
        df_m = pd.read_excel(file, sheet_name=sheet_name_matches)
        df_t = pd.read_excel(file, sheet_name=sheet_name_teams)
        df_list.append({"file": f, "m": df_m, "t": df_t})
    except FileNotFoundError:
        print("Error: Excel file not found.")
        exit()
    except ValueError:
        print("Error: Sheet not found.")
        exit()

for dfDict in df_list:
    # DataFrame -> List of Dicts
    teams = dfDict["t"].to_dict(orient="records")
    matches = dfDict["m"].to_dict(orient="records")

    # Create a df of list of teams
    team_list = []
    for team in teams:
        team_list.append({
            "Number": team["Number"],
            "Name": team["Name"]
        })

    ### DATA
    # df_data_t = pd.DataFrame(team_list)
    with open(config["folder-jsons"] + "t" + dfDict["file"] + ".json", "w") as j:
        json.dump(team_list, j, indent=4)

    # Create a df of the teams then every match time they have
    match_dict = {}

    for team in teams:
        team_matches = []

        for match in matches:
            if team["Number"] in (match["Red1"], match["Red2"], match["Blue1"], match["Blue2"]):
                team_matches.append(str(match["TimeScheduled"]))
        match_dict[team[team_id]] = team_matches

    ### DATA
    with open(config["folder-jsons"] + "m" + dfDict["file"] + ".json", "w") as j:
        json.dump(match_dict, j, indent=4)
    # df_data_m = pd.DataFrame(dict([(k, pd.Series(v)) for k, v in match_dict.items()]))


with open(config["folder-jsons"] + "divisions.json", "w") as j:
    json.dump(excel_files, j, indent=4)


