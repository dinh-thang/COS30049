import os
import re
from fastapi import UploadFile
# import requests
# from bs4 import BeautifulSoup

def save_uploaded_file(contract: UploadFile):
    """
    Saves the uploaded file to the 'uploads' directory.

    Params:
        contract (UploadFile): The uploaded file to be saved.

    Returns:
        str: The file path where the file is saved.
    """
    # ensure that the 'uploads' directory exists, exist_ok to True to specify existing dir w/o error
    os.makedirs("uploads", exist_ok=True)

    # file path within the 'uploads' directory
    file_path = os.path.join("uploads", contract.filename)

    # write the contents of the uploaded file to the specified file path
    with open(file_path, "wb") as f:
        f.write(contract.file.read())

    # return the file path where the file is saved
    return file_path


def extract_solidity_version(file_content: str):
    """
    Extracts the Solidity version from the given file content.

    Params:
        file_content (str): The content of the file.

    Returns:
        str or None: The Solidity version if found, None otherwise.
    """
    # regexp match "pragma solidity x.y.z;" or "pragma solidity ^x.y.z;"
    version_pattern = re.search(r"pragma solidity (?P<version>\^?\d+\.\d+\.\d+);", file_content)

    # return the version if found; otherwise, return None
    return version_pattern.group('version') if version_pattern else None


def analyze_contract(file_path: str, solidity_version: str):
    """
    Analyses uploaded contract by running Slither commands with the specified Solidity version.

    Params:
        file_path (str): The path to the contract file.
        solidity_version (str): The version of Solidity used in the uploaded contract.

    Returns:
        str: The path to the generated Markdown file.
    """
    # run Slither commands with the specified Solidity version
    # ! as slither cmd only accept file path as argument and return the .md file in the current directory
    cmd = f'solc-select use {solidity_version} && slither {file_path} --checklist > {file_path}.md'
    os.system(cmd)

    # return the path to the generated Markdown file
    return f"{file_path}.md"




def filter_report(file_path: str):
    """
    Reads the contents of a markdown file located at the given `file_path` and extracts the vulnerabilities and their details.

    Params:
        file_path (str): The path to the markdown file.

    Returns:
        list: A list of dictionaries containing information about each vulnerability found in the markdown file. Each dictionary has the following keys:
            - vulnerability_type (str): The type of vulnerability.
            - impact (str): The impact of the vulnerability.
            - confidence (str): The confidence level of the vulnerability.
            - results (list): A list of dictionaries containing information about each result of the vulnerability. Each dictionary has the following keys:
                - ID (int): The ID of the result.
                - description (str): The description of the result.
                - location (str): The location of the result within the contract.
    """
    with open(file_path, "r") as f:
        md_content = f.read()

        # patterns to match vulnerability types, impact, confidence, and results. 
        # ! result_pattern no ok yet, 90% ok
        vulnerability_pattern = r"##\s*(?P<vulnerability_type>[\w-]+)\nImpact:\s*(?P<impact>\w+)\nConfidence:\s*(?P<confidence>\w+)(?P<results>[\s\S]+?)(?=\n##|$)"
        # one vuln can have many results with different locations within the contract
        result_pattern = r'- \[ \] ID-(?P<id>\d+)\n(?P<description>[^\n]+)\n(?:.+\n)*\t[^\n]+\n\n[^\n]*?(?P<location>#\S+)'

        matches = re.finditer(vulnerability_pattern, md_content)

        vulnerabilities = []

        for match in matches:
            result_dict = match.groupdict()
            vulnerability_info = {
                "vulnerability_type": result_dict["vulnerability_type"],
                "impact": result_dict["impact"],
                "confidence": result_dict["confidence"],
                # "recommendation": None,  # initialise recommendation
                "results": []
            }

            # find matches for each result within the vulnerability
            results_matches = re.finditer(result_pattern, result_dict["results"])
            for result_match in results_matches:
                result = result_match.groupdict()
                vulnerability_info["results"].append({
                    "ID": int(result["id"]),
                    "description": result["description"].strip(),
                    "location": result["location"]
                })

            # find recommendation for the vulnerability type
            # ! not yet
            # vulnerability_info["recommendation"] = find_recommendation(vulnerability_info["vulnerability_type"])

            # append the vulnerability info to the list
            vulnerabilities.append(vulnerability_info)

        # return the list of vulnerabilities
        return vulnerabilities

def upload_report(report: dict):
    # debug
    # print("Uploading report to the database:")
    # print(report)
    return report

    # return a status code/msg
    # return "Report uploaded successfully"

# check name i.e., detector
def find_recommendation(check: str):
    pass

# # func get current date and time as a string
# def get_current_datetime():
#     return datetime.now().strftime("%d-%m-%Y %I:%M %p")