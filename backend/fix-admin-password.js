import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function fixAdminPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/banquet_hall_db');
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Generate a proper password hash for 'admin123'
    const properHash = await bcrypt.hash('admin123', 10);
    console.log('Generated proper hash:', properHash);
    
    // Update the admin user
    const result = await usersCollection.updateOne(
      { email: 'admin@example.com' },
      { 
        $set: { 
          password: properHash,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.modifiedCount > 0) {
      console.log('\n✅ Admin password updated successfully!\n');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
      console.log('New hash:', properHash);
    } else if (result.matchedCount > 0) {
      console.log('\n⚠️ Admin found but password not modified');
    } else {
      console.log('\n❌ Admin user not found! Creating new admin...');
      
      // Create new admin if not found
      await usersCollection.insertOne({
        name: 'Admin User',
        email: 'admin@example.com',
        password: properHash,
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('✅ New admin created successfully!');
    }
    
    // Verify the update
    const updatedAdmin = await usersCollection.findOne({ email: 'admin@example.com' });
    console.log('\nVerification:');
    console.log('Email:', updatedAdmin?.email);
    console.log('Password hash exists:', !!updatedAdmin?.password);
    console.log('Hash length:', updatedAdmin?.password?.length);
    console.log('Starts with $2a$:', updatedAdmin?.password?.startsWith('$2a$'));
    
    await mongoose.disconnect();
    console.log('\n✅ Done! You can now login with:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

fixAdminPassword();