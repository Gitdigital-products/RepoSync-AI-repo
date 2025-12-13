"""
sync_canva_design.py
Author: AI Assistant
Date: 2025-11-25
Purpose: Synchronize a Canva design from a view link to a local repository folder.
         Downloads the design as a PDF. Requires a Canva API key.
"""

import os
import requests
import argparse
from urllib.parse import urlparse, parse_qs
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def extract_design_id(canva_url):
    """
    Extract the Canva design ID from a view or share link.
    Expected format: https://www.canva.com/design/DESIGN_ID/view
    """
    try:
        parsed_url = urlparse(canva_url)
        path_parts = parsed_url.path.split('/')
        
        # Look for the design ID in the path (usually after '/design/')
        if 'design' in path_parts:
            design_index = path_parts.index('design') + 1
            if design_index < len(path_parts):
                design_id = path_parts[design_index]
                logger.info(f"Extracted design ID: {design_id}")
                return design_id
        
        # Fallback: check query parameters
        query_params = parse_qs(parsed_url.query)
        if 'utm_content' in query_params:
            design_id = query_params['utm_content'][0]
            logger.info(f"Extracted design ID from query: {design_id}")
            return design_id
        
        logger.error("Could not extract design ID from URL.")
        return None
    except Exception as e:
        logger.error(f"Error extracting design ID: {e}")
        return None

def download_canva_design(design_id, api_key, output_dir="canva_designs", format="pdf"):
    """
    Download a Canva design using the Canva API.
    Note: This requires a valid Canva API key and appropriate permissions.
    """
    # Canva API endpoint (example - check actual API documentation)
    api_url = f"https://api.canva.com/v1/designs/{design_id}/export"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "format": format.upper(),
        "pages": "all"
    }
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    output_filename = f"{design_id}.{format.lower()}"
    output_path = os.path.join(output_dir, output_filename)
    
    try:
        logger.info(f"Requesting design {design_id} from Canva API...")
        response = requests.post(api_url, json=payload, headers=headers)
        response.raise_for_status()
        
        # For this example, we assume the API returns the file directly
        # In reality, Canva API might return a job ID or download URL
        with open(output_path, 'wb') as f:
            f.write(response.content)
        
        logger.info(f"Design downloaded successfully: {output_path}")
        return output_path
    except requests.exceptions.RequestException as e:
        logger.error(f"API request failed: {e}")
        if hasattr(e.response, 'status_code'):
            logger.error(f"Status code: {e.response.status_code}")
        return None

def main():
    parser = argparse.ArgumentParser(description="Sync a Canva design to local repository")
    parser.add_argument("url", help="Canva design view or share URL")
    parser.add_argument("--api-key", help="Canva API key (or set CANVA_API_KEY env variable)")
    parser.add_argument("--output-dir", default="canva_designs", help="Output directory for designs")
    parser.add_argument("--format", default="pdf", choices=["pdf", "png", "jpg"], help="Output format")
    
    args = parser.parse_args()
    
    # Get API key from argument or environment variable
    api_key = args.api_key or os.environ.get("CANVA_API_KEY")
    if not api_key:
        logger.error("No API key provided. Use --api-key or set CANVA_API_KEY environment variable.")
        return
    
    # Extract design ID from URL
    design_id = extract_design_id(args.url)
    if not design_id:
        logger.error("Failed to extract design ID. Exiting.")
        return
    
    # Download the design
    download_canva_design(design_id, api_key, args.output_dir, args.format)
    logger.info("Sync completed.")

if __name__ == "__main__":
    main()
