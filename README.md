# n8n-nodes-spaceship

This is an n8n community node that lets you use [Spaceship.com](https://spaceship.com) in your n8n workflows.

Spaceship is a domain registration and management platform. This node allows you to automate domain operations, DNS management, contacts, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings** > **Community Nodes** in n8n
2. Select **Install**
3. Enter `n8n-nodes-spaceship` in **Enter npm package name**
4. Agree to the risks and click **Install**

### Manual Installation

```bash
npm install n8n-nodes-spaceship
```

## Credentials

To use this node, you need to set up your Spaceship API credentials:

1. Go to your [Spaceship Dashboard](https://manage.spaceship.com/)
2. Navigate to **API** section
3. Generate your **API Key** and **API Secret**
4. In n8n, create new **Spaceship API** credentials
5. Enter your API Key and API Secret

## Operations

This node supports the following resources and operations:

### Domain

- **Get**: Retrieve domain information
- **Get Many**: List all domains
- **Check Availability**: Check domain availability
- **Register**: Register a new domain
- **Delete**: Delete a domain
- **Renew**: Renew domain registration
- **Restore**: Restore a deleted domain
- **Transfer**: Transfer a domain
- **Get Auth Code**: Get domain authorization code
- **Get Transfer Info**: Get domain transfer details
- **Update Autorenewal**: Enable/disable auto-renewal
- **Update Nameservers**: Update domain nameservers
- **Update Transfer Lock**: Enable/disable transfer lock
- **Update Email Protection**: Configure email protection
- **Update Privacy**: Update privacy protection level
- **Update Contacts**: Update domain contact information

### Contact

- **Get**: Retrieve contact details
- **Save**: Create or update contact information

### Contact Attribute

- **Get**: Retrieve contact attributes
- **Save**: Save contact attributes (required for specific TLDs)

### DNS Record

- **Get Many**: List DNS records for a domain
- **Save**: Create or update DNS records (A, AAAA, CNAME, MX, TXT, ALIAS, NS, PTR)
- **Delete**: Delete DNS records

### SellerHub

- **Get**: Get domain listing details
- **Get Many**: List all domains in SellerHub
- **Create**: List a domain for sale
- **Update**: Update domain listing price
- **Delete**: Remove domain from SellerHub
- **Get Verification Records**: Get DNS verification records

### Async Operation

- **Get**: Check status of asynchronous operations (e.g., domain registration)

## Features

- ✅ Full support for all Spaceship API resources
- ✅ Automatic handling of asynchronous operations (202 Accepted responses)
- ✅ Built-in pagination support for list operations
- ✅ Comprehensive DNS record management
- ✅ Domain privacy and security settings
- ✅ SellerHub marketplace integration

## Compatibility

Tested with n8n version 1.0.0+

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Spaceship API Documentation](https://docs.spaceship.dev/)

## License

[MIT](LICENSE.md)
