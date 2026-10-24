"""
New Star Infosis — Flask Web Application Server
Production-ready Flask application for Vercel, Netlify, Render, and local execution.
"""

import os
from datetime import datetime, timezone
from flask import Flask, render_template, send_from_directory, request, jsonify, Response

app = Flask(
    __name__,
    template_folder='.',
    static_folder='.',
    static_url_path=''
)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'new-star-infosis-secret-key-2024')

# --- HTML Page Routes ---

@app.route('/')
@app.route('/index')
@app.route('/index.html')
def home():
    return render_template('index.html')

@app.route('/about')
@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/services')
@app.route('/services.html')
def services():
    return render_template('services.html')

@app.route('/projects')
@app.route('/projects.html')
def projects():
    return render_template('projects.html')

@app.route('/contact')
@app.route('/contact.html')
def contact():
    return render_template('contact.html')

# --- SEO / Indexing Routes ---

@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    """Generate an XML sitemap for Google Search Console."""
    base_url = "https://www.newstarinfosis.me"

    pages = [
        ("/", "1.0", "weekly"),
        ("/about", "0.8", "monthly"),
        ("/services", "0.8", "monthly"),
        ("/projects", "0.8", "monthly"),
        ("/contact", "0.7", "monthly"),
    ]

    lastmod = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    urls = []

    for path, priority, changefreq in pages:
        urls.append(
            f"  <url>\n"
            f"    <loc>{base_url}{path}</loc>\n"
            f"    <lastmod>{lastmod}</lastmod>\n"
            f"    <changefreq>{changefreq}</changefreq>\n"
            f"    <priority>{priority}</priority>\n"
            f"  </url>"
        )

    urls_joined = "\n".join(urls)
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls_joined}
</urlset>"""

    return Response(
        xml,
        mimetype="application/xml"
    )

@app.route('/robots.txt', methods=['GET'])
def robots():
    """Serve robots.txt for search engines."""
    content = "User-agent: *\nAllow: /\n\nSitemap: https://www.newstarinfosis.me/sitemap.xml\n"
    return Response(content, mimetype="text/plain")


# --- API Endpoints ---

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """
    Contact Form API Endpoint.
    Receives JSON or Form data, validates inputs, and responds with status.
    """
    try:
        data = request.get_json(silent=True) or request.form
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        service = data.get('service', 'General Inquiry').strip()
        message = data.get('message', '').strip()

        if not name or not email or not message:
            return jsonify({
                'status': 'error',
                'message': 'Missing required fields (name, email, message).'
            }), 400

        # Console logging for server logs
        print(f"==================================================")
        print(f"[NSI CONTACT INQUIRY RECEIVED]")
        print(f"Name:    {name}")
        print(f"Email:   {email}")
        print(f"Phone:   {phone}")
        print(f"Service: {service}")
        print(f"Message: {message}")
        print(f"==================================================")

        return jsonify({
            'status': 'success',
            'message': 'Thank you! Your message has been received by New Star Infosis.',
            'data': {
                'name': name,
                'service': service
            }
        }), 200

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Server processing error: {str(e)}'
        }), 500

# --- Error Handlers ---

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

# --- Local Runner ---
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"[NSI SERVER] Starting New Star Infosis Flask Server on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)

